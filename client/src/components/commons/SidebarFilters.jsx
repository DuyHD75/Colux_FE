// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Collapse, Checkbox, Rate, Radio } from 'antd';
// import { selectCategories } from '../../redux/reducer/categoriesSlice';
// import { selectFiltersByCategory } from '../../redux/reducer/filtersCategoriesSlice';
// import { useNavigate } from 'react-router-dom';

// const { Panel } = Collapse;

// const SidebarFilters = ({ category, onChange }) => {
//   const categories = useSelector((state) => selectCategories(state)) || [];
//   const [selectedRatings, setSelectedRatings] = useState([]);
//   const [selectedSurfaces, setSelectedSurfaces] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(category);

//   const filters = useSelector((state) =>
//     selectFiltersByCategory(state, selectedCategory)
//   ) || {};
  
//   const { surfaceOptions = [], featureOptions = [] } = filters;

//   useEffect(() => {
//     setSelectedCategory(category);
//   }, [category]);

//   useEffect(() => {
//     setSelectedRatings([]);
//     setSelectedSurfaces([]);
//     setSelectedFeatures([]);
//   }, [selectedCategory]);

//   const handleRatingChange = (value) => {
//     const newSelectedRatings = selectedRatings.includes(value)
//       ? selectedRatings.filter((item) => item !== value)
//       : [...selectedRatings, value];
//     setSelectedRatings(newSelectedRatings);
//     onChange('rating', newSelectedRatings);
//   };

//   const handleSurfaceChange = (checked, surface) => {
//     const newSelectedSurfaces = checked
//       ? [...selectedSurfaces, surface]
//       : selectedSurfaces.filter((item) => item !== surface);
//     setSelectedSurfaces(newSelectedSurfaces);
//     onChange('surface', newSelectedSurfaces);
//   };

//   const handleFeatureChange = (checked, feature) => {
//     const newSelectedFeatures = checked
//       ? [...selectedFeatures, feature]
//       : selectedFeatures.filter((item) => item !== feature);
//     setSelectedFeatures(newSelectedFeatures);
//     onChange('features', newSelectedFeatures);
//   };

//   const navigate = useNavigate();

//   const handleCategoryChange = (e) => {
//     const selectedCat = e.target.value;
//     const selectedCatName = categories.find((cat) => cat.id === selectedCat)?.name || selectedCat;
  
//     setSelectedCategory(selectedCat);
//     onChange('category', [selectedCat]);
//     navigate(`/products/${selectedCatName}`);
//   };

//   return (
//     <div style={{ backgroundColor: '#f8f8f8', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
//       <Collapse defaultActiveKey={[]} ghost>
//         <Panel header="CATEGORY" key="0" style={{ marginBottom: '10px' }}>
//           <Radio.Group onChange={handleCategoryChange} value={selectedCategory}>
//             {categories.length > 0 ? (
//               categories.map((cat) => (
//                 <Radio
//                   key={cat.id}
//                   value={cat.id}
//                   style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}
//                 >
//                   {cat.name}
//                 </Radio>
//               ))
//             ) : (
//               <div>No categories available</div>
//             )}
//           </Radio.Group>
//         </Panel>

//         <Panel header="RATING" key="1" style={{ marginBottom: '10px' }}>
//           {[1, 2, 3, 4, 5].map((value) => (
//             <div key={value} style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
//               <Checkbox
//                 checked={selectedRatings.includes(value)}
//                 onChange={() => handleRatingChange(value)}
//                 style={{ marginRight: '10px' }}
//               />
//               <Rate value={value} disabled style={{ color: '#f39c12', fontSize: 16 }} />
//             </div>
//           ))}
//         </Panel>

//         {selectedCategory && (
//           <>
//             <Panel header="SURFACE" key="2" style={{ marginBottom: '10px' }}>
//               {surfaceOptions.length > 0 ? (
//                 surfaceOptions.map((surface, index) => (
//                   <Checkbox
//                     key={index}
//                     checked={selectedSurfaces.includes(surface)}
//                     onChange={(e) => handleSurfaceChange(e.target.checked, surface)}
//                     style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}
//                   >
//                     {surface}
//                   </Checkbox>
//                 ))
//               ) : (
//                 <div>No surfaces available</div>
//               )}
//             </Panel>

//             <Panel header="FEATURES" key="3" style={{ marginBottom: '10px' }}>
//               {featureOptions.length > 0 ? (
//                 featureOptions.map((feature, index) => (
//                   <Checkbox
//                     key={index}
//                     checked={selectedFeatures.includes(feature)}
//                     onChange={(e) => handleFeatureChange(e.target.checked, feature)}
//                     style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}
//                   >
//                     {feature}
//                   </Checkbox>
//                 ))
//               ) : (
//                 <div>No features available</div>
//               )}
//             </Panel>
//           </>
//         )}
//       </Collapse>
//     </div>
//   );
// };

// export default SidebarFilters;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, Checkbox, Rate, Radio } from 'antd';
import { selectCategories } from '../../redux/reducer/categoriesSlice';
import { selectFiltersByCategory } from '../../redux/reducer/filtersCategoriesSlice';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;

const SidebarFilters = ({ category, onChange }) => {
  const categories = useSelector((state) => selectCategories(state)) || [];
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedSurfaces, setSelectedSurfaces] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const filters = useSelector((state) =>
    selectFiltersByCategory(state, selectedCategory)
  ) || {};
  
  const { surfaceOptions = [], featureOptions = [] } = filters;

  useEffect(() => {
    if (category !== selectedCategory) {
      // Khi category mới khác category hiện tại, reset bộ lọc
      setSelectedCategory(category);
      setSelectedRatings([]);
      setSelectedSurfaces([]);
      setSelectedFeatures([]);
      onChange('rating', []);
      onChange('surface', []);
      onChange('features', []);
      onChange('category', [category]);
    }
  }, [category, selectedCategory, onChange]);

  const handleRatingChange = (value) => {
    const newSelectedRatings = selectedRatings.includes(value)
      ? selectedRatings.filter((item) => item !== value)
      : [...selectedRatings, value];
    setSelectedRatings(newSelectedRatings);
    onChange('rating', newSelectedRatings);
  };

  const handleSurfaceChange = (checked, surface) => {
    const newSelectedSurfaces = checked
      ? [...selectedSurfaces, surface]
      : selectedSurfaces.filter((item) => item !== surface);
    setSelectedSurfaces(newSelectedSurfaces);
    onChange('surface', newSelectedSurfaces);
  };

  const handleFeatureChange = (checked, feature) => {
    const newSelectedFeatures = checked
      ? [...selectedFeatures, feature]
      : selectedFeatures.filter((item) => item !== feature);
    setSelectedFeatures(newSelectedFeatures);
    onChange('features', newSelectedFeatures);
  };

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    const selectedCatName = categories.find((cat) => cat.id === selectedCat)?.name || selectedCat;

    if (selectedCat === 'all') {
      // Nếu chọn "all", điều hướng đến trang tất cả sản phẩm
      navigate(`/products`);
      setSelectedCategory('all');
      setSelectedRatings([]);
      setSelectedSurfaces([]);
      setSelectedFeatures([]);
      onChange('rating', []);
      onChange('surface', []);
      onChange('features', []);
      onChange('category', ['all']);
    } else {
      // Nếu chọn category khác, cập nhật bộ lọc cho category đó
      setSelectedCategory(selectedCat);
      setSelectedRatings([]); // Reset ratings when category changes
      setSelectedSurfaces([]); // Reset surfaces when category changes
      setSelectedFeatures([]); // Reset features when category changes
      onChange('rating', []);
      onChange('surface', []);
      onChange('features', []);
      onChange('category', [selectedCat]);
      navigate(`/products/${selectedCatName}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f8f8', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <Collapse defaultActiveKey={[]} ghost>
        <Panel header="CATEGORY" key="0" style={{ marginBottom: '10px' }}>
          <Radio.Group onChange={handleCategoryChange} value={selectedCategory}>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Radio
                  key={cat.id}
                  value={cat.id}
                  style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}
                >
                  {cat.name}
                </Radio>
              ))
            ) : (
              <div>No categories available</div>
            )}
          </Radio.Group>
        </Panel>

        <Panel header="RATING" key="1" style={{ marginBottom: '10px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <div key={value} style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
              <Checkbox
                checked={selectedRatings.includes(value)}
                onChange={() => handleRatingChange(value)}
                style={{ marginRight: '10px' }}
              />
              <Rate value={value} disabled style={{ color: '#f39c12', fontSize: 16 }} />
            </div>
          ))}
        </Panel>

        {selectedCategory && (
          <>
            <Panel header="SURFACE" key="2" style={{ marginBottom: '10px' }}>
              {surfaceOptions.length > 0 ? (
                surfaceOptions.map((surface, index) => (
                  <Checkbox
                    key={index}
                    checked={selectedSurfaces.includes(surface)}
                    onChange={(e) => handleSurfaceChange(e.target.checked, surface)}
                    style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}
                  >
                    {surface}
                  </Checkbox>
                ))
              ) : (
                <div>No surfaces available</div>
              )}
            </Panel>

            <Panel header="FEATURES" key="3" style={{ marginBottom: '10px' }}>
              {featureOptions.length > 0 ? (
                featureOptions.map((feature, index) => (
                  <Checkbox
                    key={index}
                    checked={selectedFeatures.includes(feature)}
                    onChange={(e) => handleFeatureChange(e.target.checked, feature)}
                    style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}
                  >
                    {feature}
                  </Checkbox>
                ))
              ) : (
                <div>No features available</div>
              )}
            </Panel>
          </>
        )}
      </Collapse>
    </div>
  );
};

export default SidebarFilters;
