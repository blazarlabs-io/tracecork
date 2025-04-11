/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { useRouter } from "next/navigation";
import { useWineries } from "../../context/wineries";
import { Header } from "../sections/header";

export const DashboardWineriesPage = () => {
  const { wineries } = useWineries();

  const router = useRouter();

  return (
    <div>
      <Header title="Wineries" description="Manage wineries" />
      <Table>
        <TableCaption>A list of all wineries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead className="w-[200px]">Winery Name</TableHead>
            <TableHead className="w-[200px]">UID</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Representative Name</TableHead>
            <TableHead className="">Representative Email</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wineries && wineries.length > 0 && (
            <>
              {wineries.map((winery) => (
                <TableRow key={winery.id}>
                  <TableCell className="font-medium">
                    <img
                      src={winery.info.avatar}
                      className="h-12 w-12 rounded-full"
                      alt=""
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {winery.info.name}
                  </TableCell>
                  <TableCell>{winery.id}</TableCell>
                  <TableCell>{winery.billing.level}</TableCell>
                  <TableCell>{winery.info.representative.name}</TableCell>
                  <TableCell className="">
                    {winery.info.representative.email}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      className="text-primary font-medium underline"
                      onClick={() => {
                        console.log("ID", winery.id);
                        router.push(`/dashboard/winery/${winery.id}`);
                      }}
                    >
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
