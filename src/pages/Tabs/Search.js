import React from "react";
import { IonPage, IonContent, IonSearchbar } from "@ionic/react";

import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import firebase from "../../firebase";
import LinkItem from "../../components/Link/LinkItem";

const Search = () => {
  const [link, setLink] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [filteredLink, setFilteredLink] = React.useState([]);

  React.useEffect(() => {
    getInitialLinks();
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    handleSearch();
    //eslint-disable-next-line
  }, [filter]);

  function getInitialLinks() {
    firebase.db
      .collection("links")
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLink(links);
      });
  }

  function handleChange(e) {
    if (e.key === "Enter") {
      setFilter(e.target.value);
    }
  }

  function handleSearch() {
    const query = filter.toLowerCase();
    const matchedLinks = link.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLink(matchedLinks);
  }

  return (
    <IonPage>
      <SmallHeader title="Search" />
      <IonContent fullscreen>
        <LargeHeader title="Search" />
        <IonSearchbar
          placeholder="Search"
          spellCheck="false"
          type="url"
          value={filter}
          onKeyPress={handleChange}
          animated
        />
        {filteredLink.map((filtered, index) => (
          <LinkItem
            key={filtered.id}
            showCount={false}
            link={filtered}
            index={index}
            url={`/link/${filtered.id}`}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Search;
