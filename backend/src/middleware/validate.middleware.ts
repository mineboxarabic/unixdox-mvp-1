import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * Validation middleware factory
 * Validates request body, query, or params against a Zod schema
 * 
 * Usage:
 * router.post('/users', validate(CreateUserSchema), userController.create);
 */

export const validate = (schema: AnyZodObject, source: 'body' | 'query' | 'params' = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and parse the data
      const validated = await schema.parseAsync(req[source]);
      
      // Replace request data with validated & sanitized data
      req[source] = validated;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Erreur de validation',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      
      next(error);
    }
  };
};

/**
 * Validate multiple sources at once
 * 
 * Usage:
 * router.post('/users/:id/documents',
 *   validateMultiple({
 *     params: UserIdParamSchema,
 *     body: CreateDocumentSchema
 *   }),
 *   documentController.create
 * );
 */
export const validateMultiple = (schemas: {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors: any[] = [];

      // Validate body
      if (schemas.body) {
        try {
          req.body = await schemas.body.parseAsync(req.body);
        } catch (error) {
          if (error instanceof ZodError) {
            errors.push(...error.errors);
          }
        }
      }

      // Validate query
      if (schemas.query) {
        try {
          req.query = await schemas.query.parseAsync(req.query);
        } catch (error) {
          if (error instanceof ZodError) {
            errors.push(...error.errors);
          }
        }
      }

      // Validate params
      if (schemas.params) {
        try {
          req.params = await schemas.params.parseAsync(req.params);
        } catch (error) {
          if (error instanceof ZodError) {
            errors.push(...error.errors);
          }
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Erreur de validation',
          errors: errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
