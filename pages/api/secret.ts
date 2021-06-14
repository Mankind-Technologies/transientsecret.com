import type { NextApiRequest, NextApiResponse } from 'next'
import {supabase} from "../../lib/initSupabase";
import {definitions} from "../../lib/types/supabase";
import {GetSecretRequest, GetSecretResponse, SetSecretRequest} from "../../src/types";


export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    if (req.method === 'POST') {
        const request = req.body as SetSecretRequest;
        const response = await supabase
            .from<definitions["Secret"]>("Secret")
            .insert({
              KeyId: request.id,
              Secret: request.secret,
              Salt: request.salt,
              AesIv: request.iv,
              SearchKey: request.searchKey,
              ExpiresAt: new Date((new Date()).getTime() + 1000 * 60 * 60).toISOString(),
            });
        if (!response.error) {
          res.status(204).json({});
        } else {
          console.log(response.error);
          res.status(500).json({});
        }
      return;
    }
    if (req.method === 'DELETE') {
      const apiRequest = req.body as GetSecretRequest;
      const dbResponse = await supabase
          .from<definitions["Secret"]>("Secret")
          .delete({returning: 'representation', count: null})
          .eq("SearchKey", apiRequest.searchKey);
      if (!dbResponse.error) {
        if (dbResponse.body.length === 1) {
          const row = dbResponse.body[0];
          if (row.KeyId === apiRequest.keyId) {
            const apiResponse:GetSecretResponse = {
              secret: row.Secret,
              salt: row.Salt,
              iv: row.AesIv,
            };
            res.status(200).json(apiResponse);
            return;
          }
        } else {
          res.status(404).json({});
          return;
        }
      } else {
        console.log(dbResponse.error);
        res.status(500).json({});
        return;
      }
    }
    res.status(404).json({});
  } catch (e) {
    console.log(e.message);
    console.log(e);
    res.status(500).json({});
  }
}
