import { ZodError } from "zod";

const validate = (Schema) => (req, res, next) => {
  try {
    Schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json(JSON.parse(error));
    }
    next(error);
  }
};

export default validate;