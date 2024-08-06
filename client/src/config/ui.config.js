const uiConfigs = {
    style: {
         typoLines: (lines, textAlign) => ({
              textAlign: textAlign || "justify",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: lines, 
              fontFamily: '"Nunito", sans-serif', 
         }),
         mainContent: {
              maxWidth: "1366px",
              margin: "auto",
              padding: 4
         },
        
    },
    size: {
         sideBarWidth: "300px",
         contentMaxWidth: "1366px"
    }
};

export default uiConfigs;