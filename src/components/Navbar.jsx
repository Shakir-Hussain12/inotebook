import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const myLinks = [
  { to: '/', name: 'Home' },
  { to: '/about', name: 'About' },
];

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const classes = {
  one: ['bg-gray-900 text-white', 'text-gray-300 hover:bg-gray-700 hover:text-white'],
  two: ['bg-gray-200', ''],
  big: 'rounded-md px-3 py-2 text-sm font-medium',
  small: 'block rounded-md px-3 py-2 text-sm font-medium',
  common: 'block px-4 py-2 text-sm text-gray-700',
};

const getClassName = (isActive, size, type) => classNames(
  isActive ? classes[type][0] : classes[type][1],
  type === 'one' ? classes[size] : classes.common,
);

const Navbar = () => (
  <>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink
                  to="/"
                  className="flex flex-shrink-0 items-center"
                >
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </NavLink>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {myLinks.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) => getClassName(isActive, 'big', 'one')}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <NavLink
                          to="/"
                          className={({ isActive }) => getClassName(isActive, 'big', 'two')}
                        >
                          Your Profile
                        </NavLink>
                      </Menu.Item>

                      <Menu.Item>
                        <NavLink
                          to="/about"
                          className={({ isActive }) => getClassName(isActive, 'big', 'two')}
                        >
                          About
                        </NavLink>
                      </Menu.Item>

                      <Menu.Item>
                        <NavLink
                          to="/"
                          className={({ isActive }) => getClassName(isActive, 'big', 'two')}
                        >
                          Sign out
                        </NavLink>

                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {myLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) => getClassName(isActive, 'small', 'one')}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  </>
);

export default Navbar;
