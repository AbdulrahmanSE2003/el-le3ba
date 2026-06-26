import { Response } from "express";

const resHandler = <T>(res: Response, code: number, label: string, data: T) => {
  const isArr = Array.isArray(data);

  res.status(code).json({
    status: true,

    ...(isArr && { results: data.length }),

    [label]: data,
  });
};

export default resHandler;
