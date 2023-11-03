import MainMenuButton from "./MainMenuButton";

function MainMenuButtons(props) {
  const pageKeys = Object.keys(props.pages);
  const filteredPageKeys = pageKeys.filter(
    (item) => item !== props.currentPage
  );
  const pageNavigation = (pageName) => {
    props.pageNavigation(pageName);
  };

  return (
    <>
      {filteredPageKeys.map((item, index) => {
        if (index == 0 || index == 2) {
          return (
            <MainMenuButton
              offset
              key={index}
              page={props.pages[item]}
              pageNavigation={pageNavigation}
            />
          );
        }

        return (
          <MainMenuButton
            key={index}
            page={props.pages[item]}
            pageNavigation={pageNavigation}
          />
        );
      })}
    </>
  );
}

export default MainMenuButtons;
