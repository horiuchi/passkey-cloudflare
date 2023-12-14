import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/react';
import { Link } from '@remix-run/react';
import type { User } from '../../models/user';
import SvgLogo from '../SvgLogo';

export interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link className="hidden sm:block font-bold text-inherit" to="/">
            <SvgLogo className="inline-block text-2xl align-bottom" />
            Example of Passkey
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {user == null ? (
          <Button
            as={Link}
            color="primary"
            radius="full"
            variant="ghost"
            to="/login"
          >
            Log in
          </Button>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user.name}
                size="sm"
                src={user.iconUrl ?? undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" href="/account">
                My Account
              </DropdownItem>
              <DropdownItem key="logout" color="danger" href="/logout">
                Log out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
}
