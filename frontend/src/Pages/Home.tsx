import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../Utils/api-requests";
import { Home, User } from "@/@types/types";
import ListingCard from "@/Components/listing-card";
import Selector from "@/Components/selector";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../Components/ui/pagination";
import { useSearchParams } from "react-router-dom";

const Page: React.FC = () => {
  const [user, setUser] = useState("");
  const [selectedHome, setSelectedHome] = useState<number | undefined>(
    undefined
  );
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => API.get(`user/find-all`),
  });

  const { data: homes = [], isLoading: isHomesLoading } = useQuery({
    queryKey: ["homes", user],
    queryFn: () => API.get(`home/find-by-user/${user}`),
    enabled: !!user,
  });

  const onUpdateUsers = async (homeId: number, userIds: number[]) => {
    console.log("first", homeId);
    console.log("second", userIds);
    try {
      const response = await API.put(`home/update-users/${homeId}`, {
        userIds,
      });
      queryClient.invalidateQueries({ queryKey: ["homes", user] });
      queryClient.invalidateQueries({ queryKey: ["users-for-home", homeId] });
      alert(response.message);
    } catch (error) {
      console.error("Failed to update users for home:", error);
    }
  };

  const totalPages = Math.ceil(homes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const homesToDisplay = homes.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  return (
    <>
      <div className="flex items-center justify-end p-5 ">
        <Selector parameters={users} setUser={setUser} />
      </div>
      <div className="mx-5 my-2">
        {isHomesLoading ? (
          <div className="flex items-center justify-center h-80">
            No data found!
          </div>
        ) : (
          <div className="flex flex-col justify-center w-full">
            <div className="grid w-full grid-cols-1 xs:grid-cols-2 s:grid-cols-3 tablet:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 xxl:grid-cols-7 gap-y-8">
              {homesToDisplay.map((home: Home) => (
                <ListingCard
                  key={home.id}
                  users={users}
                  home={home}
                  onUpdateUsers={onUpdateUsers}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              lastPage={totalPages}
              className="pt-10"
            >
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (pageNumber === currentPage - 2 && currentPage > 3) ||
                    (pageNumber === currentPage + 2 &&
                      currentPage < totalPages - 2)
                  ) {
                    return <PaginationEllipsis key={pageNumber} />;
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
