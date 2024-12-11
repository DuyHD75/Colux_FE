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

const SidebarFilters = ({ categories, category, onChange, categoryName }) => {
  const { t } = useTranslation();
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedPropertys, setSelectedPropertys] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [properties, setProperties] = useState([]);
  const [features, setFeatures] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const { response: propertiesResponse, err: propertiesErr } =
          await productsApi.getAllProperties();
        if (propertiesResponse) {
          setProperties([...propertiesResponse.data.properties]);
        } else if (propertiesErr) {
          toast.error(propertiesErr);
        }

        const { response: featuresResponse, err: featuresErr } =
          await productsApi.getAllFeatures();
        if (featuresResponse) {
          setFeatures([...featuresResponse.data.features]);
        } else if (featuresErr) {
          toast.error(featuresErr);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching products.");
      } 
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      setSelectedPriceRange(null);
      setSelectedPropertys([]);
      setSelectedFeatures([]);
      onChange("priceRange", []);
      onChange("property", []);
      onChange("features", []);
      onChange("category", [category]);
    }
  }, [category, selectedCategory, onChange]);

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setSelectedPriceRange((prev) => (prev === value ? null : value));
    onChange("priceRange", value === selectedPriceRange ? null : value);
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
      navigate("/products");
      setSelectedCategory("all");
      onChange("category", ["all"]);
    } else {
      setSelectedCategory(selectedCat);
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
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Collapse defaultActiveKey={[]} ghost>
        <Panel
          header={t("category")}
          key="0"
          style={{ marginBottom: "10px", ...textConfigs.style.basicFont }}
        >
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

        <Panel
          header={t("price.range")}
          key="4"
          style={{ marginBottom: "10px", ...textConfigs.style.basicFont }}
        >
          <Radio.Group
            value={selectedPriceRange}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "5px 0",
              ...textConfigs.style.basicFont,
            }}
          >
            {["0-100", "100-200", "200-300", "300-400", "400-500", "500+"].map(
              (range) => (
                <Radio
                  key={range}
                  value={range}
                  onClick={() =>
                    handlePriceRangeChange({ target: { value: range } })
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 0",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {t(`price.range.${range}`)}
                </Radio>
              )
            )}
          </Radio.Group>
        </Panel>
        {categoryName && (
          <Panel
            header={t("property")}
            key="2"
            style={{
              marginBottom: "10px",
              ...textConfigs.style.basicFont,
            }}
          >
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                padding: "10px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>
                {`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}
              </style>
              {properties.length > 0 ? (
                properties
                  .filter(
                    (property) =>
                      property.category && property.category === categoryName
                  )
                  .map((property, index) => (
                    <Checkbox
                      key={index}
                      checked={selectedPropertys.includes(property.propertyId)}
                      onChange={(e) =>
                        handlepropertyChange(
                          e.target.checked,
                          property.propertyId
                        )
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
            </div>
          </Panel>
        )}

        {categoryName && (
          <Panel
            header={t("features")}
            key="3"
            style={{
              marginBottom: "10px",
              ...textConfigs.style.basicFont,
            }}
          >
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                padding: "10px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>
                {`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}
              </style>
              {features.length > 0 ? (
                features
                  .filter(
                    (feature) =>
                      feature.category && feature.category === categoryName
                  )
                  .map((feature, index) => (
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
            </div>
          </Panel>
        )}
      </Collapse>
    </div>
  );
};

export default SidebarFilters;
