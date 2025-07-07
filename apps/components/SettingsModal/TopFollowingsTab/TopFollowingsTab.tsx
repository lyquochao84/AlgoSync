"use client";

import React, { JSX, useState } from "react";

import styles from "./TopFollowingsTab.module.css";

import { TopFollowings } from "@/types/SettingsModal/TopFollowingsTab/TopFollowingsTab";

import { FaTimes, FaStar, FaRegStar  } from "react-icons/fa";
import Image from "next/image";

const dummyFollowings: TopFollowings[] = [
  { id: "1", name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "2", name: "John", avatar: "https://i.pravatar.cc/100?img=2" },
  {
    id: "3",
    name: "Johnathan Yang",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  { id: "4", name: "Sarah", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: "5", name: "Juliet", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "6", name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
  { id: "7", name: "Cait", avatar: "https://i.pravatar.cc/100?img=10" },
  { id: "8", name: "Vlad", avatar: "https://i.pravatar.cc/100?img=20" },
  { id: "9", name: "Jun", avatar: "https://i.pravatar.cc/100?img=30" },
  { id: "10", name: "BT", avatar: "https://i.pravatar.cc/100?img=40" },
];

const TopFollowingsTab: React.FC = (): JSX.Element => {
  const [favoriteFollowings, setFavoriteFollowings] = useState<TopFollowings[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Add to favorite list
  const handleAdd = (followings: TopFollowings) => {
    if (favoriteFollowings.length >= 10)
      return alert("You can only add up to 10 favorite followings people");
    if (favoriteFollowings.find((f) => f.id === followings.id)) return;
    setFavoriteFollowings([...favoriteFollowings, followings]);
  };

  // Remove from favorite list
  const handleRemove = (id: string) => {
    setFavoriteFollowings(favoriteFollowings.filter((f) => f.id !== id));
  };

  // Drag for changing the order
  const handleDrag = (dragIndex: number, hoverIndex: number) => {
    const newOrder = [...favoriteFollowings];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, removed);
    setFavoriteFollowings(newOrder);
  };

  const filteredFollowings = dummyFollowings.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        className={styles.searchInput}
        placeholder="Search followings dev..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <div className={styles.resultList}>
          {filteredFollowings.map((f) => (
            <div className={styles.resultCard} key={f.id}>
              <Image
                src={f.avatar}
                alt={f.name}
                className={styles.avatar}
                width={36}
                height={36}
              />
              <span>{f.name}</span>
              <FaRegStar
                className={styles.starIcon}
                onClick={() => handleAdd(f)}
              />
            </div>
          ))}
        </div>
      )}

      <h4 className={styles.sectionTitle}>
        Your Favorite Followings Dev ({favoriteFollowings.length}/10)
      </h4>
      <div className={styles.favoriteList}>
        {favoriteFollowings.map((f, index) => (
          <div
            key={f.id}
            className={styles.favoriteCard}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("index", index.toString())
            }
            onDragOver={(e) => {
              e.preventDefault();
              const dragIndex = Number(e.dataTransfer.getData("index"));
              handleDrag(dragIndex, index);
            }}
          >
            <Image src={f.avatar} alt={f.name} className={styles.avatar} width={36} height={36}/>
            <span>{f.name}</span>
            <FaTimes
              className={styles.removeIcon}
              onClick={() => handleRemove(f.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFollowingsTab;
