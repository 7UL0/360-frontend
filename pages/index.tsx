import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import React from 'react';
import UserList from '../components/UserList';

const HomePage: React.FC = () => {
    return (
        <><Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <h1>Home Page</h1>
        <UserList />
      </Layout></>
    );
};

export default HomePage;


/*{import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import { fetchUsers } from '../api';

interface User {
  id: number;
  login: string;
  password: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
      async function loadUsers() {
          const fetchedUsers = await fetchUsers();
          setUsers(fetchedUsers);
      }
      loadUsers();
  }, []);

  return (
      <ul>
          {users.map((user) => (
              <li key={user.id}>
                  {user.login}
              </li>
          ))}
      </ul>
  );
};


const LoginPage: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/hello')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Się nie bało i zje', error);
      });
  }, []);

  return (
    <div>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <h1>Logowanie</h1>
        <LoginForm />
        <div className={utilStyles.message}>
          <h2>Message from Backend:</h2>
          <p>{message}</p>
          <p>Lista:</p>
          <UserList></UserList>
        </div>
      </Layout>
    </div>
  );
};

export default LoginPage;}*/

////////////////////////////////////////////////////////////////////////////////////////////////////

/*// components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';

interface Product {
    id: string;
    name: string;
    price: number;
    // Other properties...
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        }
        loadProducts();
    }, []);

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    {product.name} - ${product.price}
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
 */
