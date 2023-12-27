import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { Form } from '@remix-run/react';
import { FaKey, FaPen, FaPlus, FaTrash } from 'react-icons/fa6';
import type { Authenticator } from '../../models/authenticator';
import type { User } from '../../models/user';
import type { WebAuthnOptionsResponse } from '../../services/webauthn';
import { handleFormSubmit } from '../../services/webauthn';

interface PasskeysProps {
  user: User;
  authenticators: Authenticator[];
  opts: WebAuthnOptionsResponse;
}

interface AddPasskeyButtonProps {
  username: string;
  opts: WebAuthnOptionsResponse;
}

function AddPasskeyButton({ username, opts }: AddPasskeyButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="text-right">
        <Button
          onPress={onOpen}
          color="default"
          variant="ghost"
          startContent={<FaPlus />}
        >
          Add Passkey
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <Form
              action="/auth/passkey"
              onSubmit={handleFormSubmit(opts)}
              method="POST"
            >
              <ModalHeader className="flex flex-col gap-1">
                Add Passkey
              </ModalHeader>
              <ModalBody>
                <Input
                  name="name"
                  autoFocus
                  endContent={<FaKey />}
                  label="Name"
                  placeholder="Enter your Passkey name"
                  variant="flat"
                  required
                />
                <input type="hidden" name="username" value={username} />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  name="intent"
                  value="registration"
                  color="primary"
                  variant="ghost"
                >
                  Add
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

interface DeletePasskeyButtonProps {
  authenticator: Authenticator;
}

function DeletePasskeyButton({ authenticator }: DeletePasskeyButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Delete key">
        <Button isIconOnly variant="ghost" aria-label="Delete" onPress={onOpen}>
          <FaTrash />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <Form action="delete" method="POST">
              <ModalHeader className="flex flex-col gap-1">
                Delete Passkey
              </ModalHeader>
              <ModalBody>
                <p>
                  Do you really want to delete the passkey named
                  <span className="font-semibold">{` ${authenticator.name} `}</span>
                  ?
                </p>
                <input
                  type="hidden"
                  name="id"
                  value={authenticator.credentialID}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color="danger" variant="ghost">
                  Delete
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Passkeys({
  user,
  authenticators,
  opts,
}: PasskeysProps) {
  const username = user.email;

  return (
    <>
      <h1 className="text-3xl font-bold m-4">Passkeys</h1>
      <div className="w-2/3 max-w-2xl">
        <AddPasskeyButton username={username} opts={opts} />

        <Table hideHeader className="mt-2" aria-label="my authenticators table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody items={authenticators}>
            {(item) => (
              <TableRow key={item.credentialID}>
                <TableCell>
                  <Input
                    classNames={{ mainWrapper: 'w-full' }}
                    type="text"
                    label=""
                    labelPlacement="outside-left"
                    variant="bordered"
                    defaultValue={item.name}
                    description={item.credentialID}
                    isReadOnly
                    endContent={
                      <Button
                        isIconOnly
                        color="default"
                        variant="light"
                        aria-label="Edit"
                      >
                        <FaPen />
                      </Button>
                    }
                  />
                </TableCell>
                <TableCell className="flex justify-around">
                  <DeletePasskeyButton authenticator={item} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
