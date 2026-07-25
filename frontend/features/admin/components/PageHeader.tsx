type PageHeaderProps = {
  title: string;
  description?: string;
};

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
