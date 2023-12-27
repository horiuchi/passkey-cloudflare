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

interface AddPasskeyModalProps {
  username: string;
  opts: WebAuthnOptionsResponse;
}

function AddPasskeyModal({ username, opts }: AddPasskeyModalProps) {
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
        <AddPasskeyModal username={username} opts={opts} />

        <Table hideHeader className="mt-2" aria-label="my authenticators table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody items={authenticators}>
            {(item) => (
              <TableRow key={item.credentialID}>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">
                      {item.name}
                    </p>
                    <p className="text-bold text-tiny capitalize text-default-400">
                      {item.credentialID}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="flex justify-around">
                  <Tooltip content="Edit name">
                    <Button
                      isIconOnly
                      color="primary"
                      variant="ghost"
                      aria-label="Edit"
                    >
                      <FaPen />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete key">
                    <Button
                      isIconOnly
                      color="danger"
                      variant="ghost"
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
