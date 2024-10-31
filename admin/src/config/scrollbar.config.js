const customScrollbarStyle = {
    '::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: '#A8A8A8',
    },
    '::-webkit-scrollbar-track': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
      backgroundColor: '#F5F5F5',
    },
    '::-webkit-scrollbar': {
      width: '2px',
      backgroundColor: '#F5F5F5',
    }
  };
  export default customScrollbarStyle;