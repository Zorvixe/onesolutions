import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Edit, Trash } from "lucide-react";
import "./ChatMain.css";

const MessageMenu = ({ onEdit, onDelete, position = "right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`message-menu-container ${position}`} ref={menuRef}>
      <button 
        className="message-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdKeyboardArrowDown size={15} color="#000" />
      </button>
      {isOpen && (
        <div className="message-menu-dropdown">
          <button onClick={() => { onEdit(); setIsOpen(false); }}>
          <Edit size={16}  className="messgae-menu-icons" />  Edit
          </button>
          <button className="message-delete" onClick={() => { onDelete(); setIsOpen(false); }}>
          <Trash size={16} className="messgae-menu-icons"/>  Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageMenu;
