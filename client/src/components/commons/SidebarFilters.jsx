import React, { useState, useEffect } from "react";
import { Collapse, Checkbox, Rate, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import { toast } from "react-toastify";
import productsApi from "../../api/modules/products.api";
import { useTranslation } from "react-i18next"; 
import textConfigs from "../../config/text.config";

const { Panel } = Collapse;

const SidebarFilters = ({ categories, category, onChange }) => {
  const { t } = useTranslation();
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedPropertys, setSelectedPropertys] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [ properties, setProperties ] = useState([]);
  const [ features, setFeatures ] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setGlobalLoading(true)); 
  
      try {
       
        const { response: propertiesResponse, err: propertiesErr } = await productsApi.getAllProperties();
        if (propertiesResponse) {
          setProperties([...propertiesResponse.data.properties]);
        } else if (propertiesErr) {
          toast.error(propertiesErr);
        }

        const { response: featuresResponse, err: featuresErr } = await productsApi.getAllFeatures();
        if (featuresResponse) {
          setFeatures([...featuresResponse.data.features]);
        } else if (featuresErr) {
          toast.error(featuresErr);
        }
  
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching products.");
      } finally {
        dispatch(setGlobalLoading(false)); 
      }
    };
  
    fetchData();
  }, [dispatch]);


  useEffect(() => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      setSelectedRatings([]);
      setSelectedPropertys([]);
      setSelectedFeatures([]);
      onChange("rating", []);
      onChange("property", []);
      onChange("features", []);
      onChange("category", [category]);
    }
  }, [category, selectedCategory, onChange]);

  const handleRatingChange = (value) => {
    const newSelectedRatings = selectedRatings.includes(value)
      ? selectedRatings.filter((item) => item !== value)
      : [...selectedRatings, value];
    setSelectedRatings(newSelectedRatings);
    onChange("rating", newSelectedRatings);
  };

  const handlepropertyChange = (checked, propertyId) => {
    const newSelectedpropertys = checked
      ? [...selectedPropertys, propertyId]
      : selectedPropertys.filter((item) => item !== propertyId); 
    setSelectedPropertys(newSelectedpropertys);
    onChange("property", newSelectedpropertys);
  };
  
  const handleFeatureChange = (checked, featureId) => {
    const newSelectedFeatures = checked
      ? [...selectedFeatures, featureId]
      : selectedFeatures.filter((item) => item !== featureId); 
    setSelectedFeatures(newSelectedFeatures);
    onChange("features", newSelectedFeatures);
  };

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    const selectedCatName =
      categories.find((cat) => cat.categoryId === selectedCat)?.name ||
      selectedCat;

    if (selectedCat === "all") {
      navigate(`/products`);
      setSelectedCategory("all");
      onChange("category", ["all"]);
    } else {
      setSelectedCategory(selectedCat);
      onChange('category', [selectedCat]);
      navigate(`/products/${selectedCatName}/${selectedCat}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f8f8",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <Collapse defaultActiveKey={[]} ghost>
        <Panel header={t("category")} key="0" style={{ marginBottom: "10px", ...textConfigs.style.basicFont, }}>
          <Radio.Group onChange={handleCategoryChange} value={selectedCategory}>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Radio
                  key={cat.categoryId}
                  value={cat.categoryId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 0",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {cat.name}
                </Radio>
              ))
            ) : (
              <div>{t("no.category")}</div>
            )}
          </Radio.Group>
        </Panel>
        <Panel header={t("rating")} key="1" style={{ marginBottom: "10px", ...textConfigs.style.basicFont, }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <div
              key={value}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px 0",
              }}
            >
              <Checkbox
                checked={selectedRatings.includes(value)}
                onChange={() => handleRatingChange(value)}
                style={{ marginRight: "10px" }}
              />
              <Rate
                value={value}
                disabled
                style={{ color: "#f39c12", fontSize: 16 }}
              />
            </div>
          ))}
        </Panel>
    
        <Panel header={t("property")} key="2" style={{ marginBottom: "10px", ...textConfigs.style.basicFont, }}>
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <Checkbox
                key={index}
                checked={selectedPropertys.includes(property.propertyId)} 
                onChange={(e) =>
                  handlepropertyChange(e.target.checked, property.propertyId)
                } 
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 0",
                  ...textConfigs.style.basicFont,
                }}
              >
                {property.name}
              </Checkbox>
            ))
          ) : (
            <div>{t("no.property")}</div>
          )}
        </Panel>
       
        <Panel header={t("features")} key="3" style={{ marginBottom: "10px", ...textConfigs.style.basicFont, }}>
          {features.length > 0 ? (
            features.map((feature, index) => (
              <Checkbox
                key={index}
                checked={selectedFeatures.includes(feature.featureId)} 
                onChange={(e) =>
                  handleFeatureChange(e.target.checked, feature.featureId)
                } 
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 0",
                  ...textConfigs.style.basicFont,
                }}
              >
                {feature.name}
              </Checkbox>
            ))
          ) : (
            <div>{t("no.features")}</div>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default SidebarFilters;
