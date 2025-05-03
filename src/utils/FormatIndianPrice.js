const formatIndianPrice = (price) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    });
  };

  export default  formatIndianPrice