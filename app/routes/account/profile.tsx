import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Form } from '@remix-run/react';
import type { User } from '../../models/user';

export interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <>
      <h1 className="text-3xl font-bold m-4">Profile</h1>
      <Table
        className="w-2/3 max-w-2xl"
        hideHeader
        aria-label="user profile table"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>VALUE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="icon">
            <TableCell>icon</TableCell>
            <TableCell>
              {user.iconUrl != null ? <Avatar src={user.iconUrl} /> : null}
            </TableCell>
          </TableRow>
          <TableRow key="name">
            <TableCell>name</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow key="email">
            <TableCell>email</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Form action="/edit" method="post">
        <Button type="submit" className="mt-4" color="primary" variant="ghost">
          Edit Profile
        </Button>
      </Form>
    </>
  );
}
