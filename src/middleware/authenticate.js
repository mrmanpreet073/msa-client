import * as jose from "jose";

const JWKS = jose.createRemoteJWKSet(
  new URL("https://msa-auth.onrender.com/.well-known/jwks.json")
);

export const authenticate = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];
  console.log("Received Token:", token);

  try {

    const { payload } = await jose.jwtVerify(token, JWKS,
      { algorithms: ["RS256"], issuer: "https://msa-auth.onrender.com", }
    );
    console.log("Payload:", payload);
    req.user = payload;
    next();

  } catch (err) {

    console.error(err);
    return res.status(401).json({
      error: "Invalid Token"
    });

  }
};