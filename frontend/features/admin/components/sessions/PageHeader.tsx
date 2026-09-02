import CreateReport from "@/components/shared/CreateReport";

const PageHeader = () => {
  return (
    <div className={` flex items-center justify-between`}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">إدارة المباريات</h1>
        <p className="text-sm text-muted-foreground mt-1">
          صفحة التحكم في جميع مباريات اللعبة
        </p>
      </div>

      <CreateReport/>
    </div>
  );
};

export default PageHeader;
