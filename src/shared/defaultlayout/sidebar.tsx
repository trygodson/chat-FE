import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RouteComponentProps } from 'react-router';

import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MenuList } from '../utils/sidemenu';
import { filteredList, showAnimation } from '../helpers';

interface SidebarProps extends RouteComponentProps {
  isOpen: boolean;
  toggle: Function;
}
const SideBar: React.FC<SidebarProps> = ({ isOpen, toggle, location }) => {
  const splitLocation = location.pathname.split('/');

  return (
    <motion.div
      animate={{
        width: isOpen ? '225px' : '60px',

        transition: {
          duration: 0.25,
          type: '',
          damping: 10,
        },
      }}
      className="h-screen text-white overflow-y-auto bg-appcolor-900"
    >
      <div className="flex justify-end items-center">
        <div className="bars">
          <FaBars size={22} onClick={() => toggle()} />
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        {filteredList(MenuList).map((x) => {
          var node;
          var sub_node;

          return (
            <motion.div>
              <AnimatePresence>
                <motion.div>
                  <motion.div
                    className={`link flex justify-between ${
                      `/${splitLocation[1]}/${splitLocation[2]}` == x.to && `active`
                    }`}
                  >
                    <NavLink key={x.to} to={x.to} className="flex my-1" activeClassName="">
                      <i className={`${x.icon} text-xl`}></i>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="text-base ml-2 border-0 font-semibold"
                        >
                          {x.label}
                        </motion.div>
                      )}
                    </NavLink>
                    {/* {isOpen && <motion.i className="fi fi-rr-angle-small-down text-lg" />} */}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SideBar;
