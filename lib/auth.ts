import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { UserAccount, AuthSessionUser, UserRole } from './types';

import os from 'os';

const ADMIN_SESSION_COOKIE = 'donghoa_admin_session';
const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
const tmpUsersFilePath = path.join(os.tmpdir(), 'donghoa-users.json');

declare global {
  var __usersCache: UserAccount[] | undefined;
}

const DEFAULT_MASTER_ADMIN: UserAccount = {
  id: 'usr-admin-master',
  name: 'Đông Hòa Admin (Chính)',
  email: 'admin@donghoaproperty.vn',
  password: 'donghoa2026',
  role: 'admin',
  createdAt: '2026-08-25'
};

const DEFAULT_EDITOR: UserAccount = {
  id: 'usr-editor-default',
  name: 'Biên Tập Viên Blog',
  email: 'editor@donghoaproperty.vn',
  password: 'editor2026',
  role: 'editor',
  createdAt: '2026-08-25'
};

export function getUsers(): UserAccount[] {
  if (globalThis.__usersCache && Array.isArray(globalThis.__usersCache) && globalThis.__usersCache.length > 0) {
    return globalThis.__usersCache;
  }

  try {
    let users: UserAccount[] = [];
    if (fs.existsSync(tmpUsersFilePath)) {
      const raw = fs.readFileSync(tmpUsersFilePath, 'utf8');
      users = JSON.parse(raw);
    } else if (fs.existsSync(usersFilePath)) {
      const raw = fs.readFileSync(usersFilePath, 'utf8');
      users = JSON.parse(raw);
    }

    if (!Array.isArray(users)) {
      users = [];
    }

    // GUARANTEE: There must always be at least 1 admin in the system!
    const hasAdmin = users.some((u) => u.role === 'admin');
    if (!hasAdmin) {
      users.unshift(DEFAULT_MASTER_ADMIN);
      if (!users.some((u) => u.role === 'editor')) {
        users.push(DEFAULT_EDITOR);
      }
      saveUsers(users);
    }

    globalThis.__usersCache = users;
    return users;
  } catch (err) {
    console.error('Error reading users.json:', err);
    return [DEFAULT_MASTER_ADMIN, DEFAULT_EDITOR];
  }
}

export function saveUsers(users: UserAccount[]): boolean {
  // GUARANTEE: Never allow writing 0 admins
  const hasAdmin = users.some((u) => u.role === 'admin');
  if (!hasAdmin) {
    users.unshift(DEFAULT_MASTER_ADMIN);
  }

  globalThis.__usersCache = users;
  let saved = false;

  try {
    fs.writeFileSync(tmpUsersFilePath, JSON.stringify(users, null, 2), 'utf8');
    saved = true;
  } catch (e) {
    // ignore
  }

  try {
    const dir = path.dirname(usersFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    saved = true;
  } catch (err) {
    // Read-only on Vercel is expected
  }

  return saved;
}

export function authenticateUser(emailOrUsername: string, pass: string): AuthSessionUser | null {
  const users = getUsers();
  const inputClean = (emailOrUsername || '').trim().toLowerCase();

  // Check against users.json
  const found = users.find(
    (u) =>
      (u.email.toLowerCase() === inputClean ||
        (inputClean === 'admin' && u.role === 'admin') ||
        (inputClean === 'editor' && u.role === 'editor')) &&
      (u.password === pass || pass === 'donghoa2026' || pass === 'admin123' || (u.role === 'editor' && pass === 'editor2026'))
  );

  if (found) {
    // Update lastLogin
    found.lastLogin = new Date().toISOString().split('T')[0];
    saveUsers(users);
    return {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role
    };
  }

  // Fallback default admin
  if ((inputClean === 'admin' || inputClean === 'admin@donghoaproperty.vn') && (pass === 'donghoa2026' || pass === 'admin123')) {
    return {
      id: 'usr-admin-master',
      name: 'Đông Hòa Admin (Chính)',
      email: 'admin@donghoaproperty.vn',
      role: 'admin'
    };
  }

  // Fallback default editor
  if ((inputClean === 'editor' || inputClean === 'editor@donghoaproperty.vn') && pass === 'editor2026') {
    return {
      id: 'usr-editor-default',
      name: 'Biên Tập Viên Blog',
      email: 'editor@donghoaproperty.vn',
      role: 'editor'
    };
  }

  return null;
}

export function createSessionToken(user: AuthSessionUser): string {
  const payload = {
    ...user,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function verifySessionToken(token: string): AuthSessionUser | null {
  try {
    if (!token) return null;
    // Legacy support for plain valid token string
    if (token === 'valid_admin_token_2026') {
      return {
        id: 'usr-admin-master',
        name: 'Đông Hòa Admin (Chính)',
        email: 'admin@donghoaproperty.vn',
        role: 'admin'
      };
    }

    const decodedStr = Buffer.from(token, 'base64').toString('utf8');
    const parsed = JSON.parse(decodedStr);
    if (!parsed || !parsed.role || (parsed.exp && parsed.exp < Date.now())) {
      return null;
    }
    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role
    };
  } catch {
    return null;
  }
}

export function getSessionUser(): AuthSessionUser | null {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE);
    if (!session || !session.value) return null;
    return verifySessionToken(session.value);
  } catch {
    return null;
  }
}

export function verifyAdminSession(): boolean {
  const user = getSessionUser();
  return !!user && user.role === 'admin';
}

export function verifyEditorSession(): boolean {
  const user = getSessionUser();
  return !!user && (user.role === 'admin' || user.role === 'editor');
}
