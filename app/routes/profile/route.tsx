import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { authenticator } from '../../services/auth.server';
import Layout from '../../components/layout';
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

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
  return json({ user });
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Layout user={user}>
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <Table className="w-2/3" hideHeader aria-label="user profile table">
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
    </Layout>
  );
}
