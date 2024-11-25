"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  const defaultRoles = [
    {
      id: "1",
      name: "USER",
      permissions: ["read:own", "write:own"],
    },
    {
      id: "2",
      name: "MODERATOR",
      permissions: ["read:all", "write:own", "moderate:content"],
    },
    {
      id: "3",
      name: "ADMIN",
      permissions: ["read:all", "write:all", "delete:all", "manage:users"],
    },
  ];

  useEffect(() => {
    // In a real app, you'd fetch roles from an API
    setRoles(defaultRoles);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Role Management</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <CardTitle>{role.name.toUpperCase()}</CardTitle>
              <CardDescription>Role Permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2">
                {role.permissions.map((permission) => (
                  <li key={permission}>{permission.toUpperCase()}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
