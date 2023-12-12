import { Divider, Link } from '@nextui-org/react';

export default function Footer() {
  return (
    <>
      <Divider />
      <footer className="flex justify-end p-unit-sm opacity-60">
        <Link color="foreground" href="https://github.com/horiuchi/">
          Powered by @horiuchi
        </Link>
      </footer>
    </>
  );
}
