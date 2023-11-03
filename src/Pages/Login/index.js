// import './login.css';
// import React from 'react';
// import email_icon from '../Assets/email.png';
// import password_icon from '../Assets/password.png';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mantine/core';

// function Login() {
//   const navigate = useNavigate();
//   return (
//     <div className='container'>
//       <div className='header'>
//         <div className='text'>Login</div>
//         <div className='underline'></div>
//       </div>
//       <div className='inputs'>
//         <select name="type" id="type">
//           <option value="customer">Customer</option>
//           <option value="provider">Provider</option>
//         </select>
//         <div className='input'>
//           <img src={email_icon} alt=""/>
//           <input type='email' placeholder='Email ID'/>
//         </div>
//         <div className='input'>
//           <img src={password_icon} alt=""/>
//           <input type='password' placeholder='Password'/>
//         </div>
//         {/* <div className='forgotPassword'>Forgot Password? <span>Click Here</span></div> */}
//         <div className='forgotPassword'>New User? <span onClick={() => {navigate('/Register')}}>Click Here</span></div>
//         <div className='submitcontainer'>
//           <div className="submit">Login</div>
//         </div>
//       </div>
//     </div>
    
//   );
// }

// export default Login;

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
// import { GoogleButton } from './GoogleButton';
// import { TwitterButton } from './TwitterButton';

function Login(props) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <Button>Google</Button>
        <Button>Twitter</Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default Login
