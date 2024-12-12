import { getAuditData } from "../services/npmService";
import { getNestedKeys } from "../utils/getNestedKeys";

export const checkPackgeDependency = async (req: { body: any }, res: any) => {
  const dependencyJson = req.body;

  const response = await getAuditData(dependencyJson);
  res.send(response);
};
