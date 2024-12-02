import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableCell, TableRow, TableBody } from '@/components/ui/table';
import React from 'react';

const DashboardSkeleton = () => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                    <Skeleton className="h-6 w-[200px]" />
                </h2>
                <Table>
                    <TableBody>
                        {/* Render skeletons for each row */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-6 w-full" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-24" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-32" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-32" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DashboardSkeleton;