// import {
//     Anchor,
//     Button,
//     Checkbox,
//     Container,
//     Group,
//     Paper,
//     PasswordInput,
//     Text,
//     TextInput,
//     Title,
// } from "@mantine/core";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAuthentication } from "../store/authenticationSlice";
// import { useNavigate } from "react-router-dom";
// import classes from "../style/AuthenticationTitle.module.css";

// function AuthenticationTitle() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { status } = useSelector((state: any) => state.authentication);

//     const handleLogin = async () => {
//         const response = await dispatch(
//             fetchAuthentication({ username: email, password }) as any
//         );
//         if (response.meta.requestStatus === "fulfilled") {
//             navigate("/dashboard");
//         }
//     };

//     return (
//         <Container size={420} my={40}>
//             <Title ta="center" className={classes.title}>
//                 Welcome back!
//             </Title>
//             <Text c="dimmed" size="sm" ta="center" mt={5}>
//                 Do not have an account yet?{" "}
//                 <Anchor size="sm" component="button">
//                     Create account
//                 </Anchor>
//             </Text>

//             <Paper withBorder shadow="md" p={30} mt={30} radius="md">
//                 <TextInput
//                     label="Email"
//                     placeholder="you@mantine.dev"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <PasswordInput
//                     label="Password"
//                     placeholder="Your password"
//                     required
//                     mt="md"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <Group justify="space-between" mt="lg">
//                     <Checkbox label="Remember me" />
//                     <Anchor component="button" size="sm">
//                         Forgot password?
//                     </Anchor>
//                 </Group>
//                 <Button
//                     fullWidth
//                     mt="xl"
//                     onClick={handleLogin}
//                     disabled={status === "loading"}
//                 >
//                     {status === "loading" ? "Signing in..." : "Sign in"}
//                 </Button>
//             </Paper>
//         </Container>
//     );
// }

// export default AuthenticationTitle;
