import { NextFunction, Request, Response } from "express";
import { worlds } from "../services/worldsService";

interface IWorldsService {
  getWorlds: (name: string) => string[];
}

export default function (worldsService: IWorldsService) {
  const operations = {
    GET,
  };

  function GET(req: Request, res: Response, next: NextFunction) {
    res
      .status(200)
      .json(
        worldsService.getWorlds(
          req.query.worldName as unknown as keyof typeof worlds
        )
      );
  }

  // NOTE: We could also use a YAML string here.
  GET.apiDoc = {
    summary: "Returns worlds by name.",
    operationId: "getWorlds",
    parameters: [
      {
        in: "query",
        name: "worldName",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "A list of worlds that match the requested name.",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/World",
          },
        },
      },
      default: {
        description: "An error occurred",
        schema: {
          additionalProperties: true,
        },
      },
    },
  };

  return operations;
}
