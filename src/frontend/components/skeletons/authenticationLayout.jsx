import {Card, Skeleton} from "antd";

export const AuthenticationLayoutSkeleton = () => (
  <main className={`flex flex-col items-center justify-center p-6 h-screen`}>
    <Card className="w-full md:max-w-md">
      <Skeleton
        active
        avatar
        paragraph={{
          rows: 4,
        }}
      />
      <Skeleton
        active
        className="mt-4"
        paragraph={{
          rows: 4,
        }}
      />
    </Card>
  </main>
);
