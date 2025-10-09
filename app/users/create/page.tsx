'use client';
import { useEffect, useState, useTransition } from 'react';
import { createUserAction, getUsersAction } from '@/app/actions/user.actions';
import type { UserResponseDTO } from '@/services/dto/user.dto';

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponseDTO[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const res = await getUsersAction();
      if (res.success) setUsers(res.users);
      else console.error(res.error);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    startTransition(async () => {
      const res = await createUserAction(data);
      if (res.success && res.user) {
        setUsers((prev) => [res.user, ...prev]);
        e.currentTarget.reset();
      } else {
        alert(res.error);
      }
    });
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input name="name" placeholder="Name" className="border p-2 rounded" required />
        <input name="email" placeholder="Email" className="border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" className="border p-2 rounded" required />
        <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded">
          {isPending ? 'Saving...' : 'Create'}
        </button>
      </form>

      <section>
        <h2 className="font-semibold text-lg">All Users</h2>
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} <span className="text-gray-500">({u.email})</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
