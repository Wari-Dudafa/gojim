import MenuButton from "./MenuButton";

function MenuButtons(props) {
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
        return (
          <MenuButton
            offset={index == 0 || index == filteredPageKeys.length - 1}
            key={index}
            page={props.pages[item]}
            pageNavigation={pageNavigation}
            toggleMenu={props.toggleMenu}
          />
        );
      })}
    </>
  );
}

export default MenuButtons;
