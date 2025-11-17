// Authentication utility functions
// Stores users in localStorage (simulating a database)

// Get all users from localStorage
const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Sign up a new user
export const signUp = (name, email, password) => {
  const users = getUsers();
  
  // Check if user already exists
  const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return {
      success: false,
      error: 'An account with this email already exists. Please sign in instead.'
    };
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password, // In production, this should be hashed
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  };
};

// Sign in an existing user
export const signIn = (email, password) => {
  const users = getUsers();
  
  // Find user by email
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return {
      success: false,
      error: 'No account found with this email. Please sign up first.'
    };
  }

  // Check password
  if (user.password !== password) {
    return {
      success: false,
      error: 'Incorrect password. Please try again.'
    };
  }

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Save current user to localStorage
export const saveCurrentUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove current user (logout)
export const removeCurrentUser = () => {
  localStorage.removeItem('user');
};

