import {Card, Skeleton} from "antd";
import React from "react";

export const DataSkeletonCard = () => {
  return (
    <Card>
      <Skeleton className="mb-2" active />
      <Skeleton className="mb-2" active />
      <Skeleton className="mb-2" active />
    </Card>
  );
};
