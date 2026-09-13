import { Router } from "express";
import { emailAvailable, login, logout, register, updateEmail, updatePassword, UserPayload, verifyEmail } from "../controllers/user.controller";
import { auth } from "../utils/auth";
import { emailAvailableValidator, loginValidator, registerValidator, updateEmailValidator, updatePasswordValidator, verifyEmailValidator } from "../validators";

const router = Router();


// api/users

router.get("/email", emailAvailableValidator, emailAvailable);

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/verify", verifyEmailValidator, verifyEmail);

router.use(auth<UserPayload>());

router.get("/logout", logout);


router.patch("/email", updateEmailValidator, updateEmail);

router.patch("/password", updatePasswordValidator, updatePassword);


export default router;