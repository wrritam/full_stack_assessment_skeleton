import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { IconCheck, IconX, IconFilter } from "@tabler/icons-react";
import { Home, User } from "@/@types/types";
import { useQuery } from "@tanstack/react-query";
import API from "../Utils/api-requests";

type Props = {
  users: User[];
  home: Home;
  onUpdateUsers: (homeId: number, userIds: number[]) => void;
};

const ListingCard: React.FC<Props> = ({ users, home, onUpdateUsers }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const { data: usersForHome, isLoading: isUsersForHomeLoading } = useQuery({
    queryKey: ["users-for-home", home.id],
    queryFn: () => API.get(`user/find-by-home/${home.id}`),
    enabled: isOpen,
  });

  useEffect(() => {
    if (usersForHome && isOpen) {
      setSelectedUsers(usersForHome.map((user: User) => user.id));
    }
  }, [usersForHome, isOpen]);

  const onConfirm = () => {
    onUpdateUsers(home.id, selectedUsers);
    setIsOpen(false);
  };

  return (
    <Card className="w-60 bg-gradient-to-l from-grey-200 to-slate-400 border border-slate-300 grid grid-cols-1 justify-center p-4 gap-4 rounded-xl shadow-md text-black font-[Quicksand]">
      <CardHeader>
        <CardTitle className="text-lg font-bold capitalize">{home.street_address}</CardTitle>
        <CardDescription className="text-sm text-gray-600">Detailed view of the property</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2">
        <p className="text-sm"><span className="font-bold">Address:</span> {home.street_address}</p>
        <p className="text-sm"><span className="font-bold">Baths:</span> {home.baths}</p>
        <p className="text-sm"><span className="font-bold">Beds:</span> {home.beds}</p>
        <p className="text-sm"><span className="font-bold">List Price:</span> ${home.list_price.toLocaleString()}</p>
        <p className="text-sm"><span className="font-bold">Sqft:</span> {home.sqft}</p>
        <p className="text-sm"><span className="font-bold">State:</span> {home.state}</p>
        <p className="text-sm"><span className="font-bold">Zip:</span> {home.zip}</p>
      </CardContent>
      <Button
        variant="expandIcon"
        iconPlacement="right"
        Icon={IconFilter}
        size="sm"
        type="submit"
        className="w-full text-sm font-normal"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </Button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Users for: {home.street_address}</DialogTitle>
          </DialogHeader>
          <div className="py-5">
            {users.map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers([...selectedUsers, user.id]);
                    } else {
                      setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
                    }
                  }}
                />
                <label htmlFor={`user-${user.id}`}>{user.username}</label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="expandIcon"
              iconPlacement="right"
              Icon={IconX}
              size="sm"
              type="submit"
              className="text-sm font-normal"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="expandIcon"
              iconPlacement="right"
              Icon={IconCheck}
              size="sm"
              type="submit"
              className="text-sm font-normal"
              onClick={onConfirm}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ListingCard;
