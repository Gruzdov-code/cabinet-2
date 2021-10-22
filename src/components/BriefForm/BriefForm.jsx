import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { articlesService } from "../../services/ArticlesService";
import Input from "../Input/Input";
import FormField from "../FormField/FormField";
import { useAddArticleMutation } from "../../api/endpoints/BriefApi";
import Loader from "../Loader";
import userFilesService from "../../services/UserFilesService";

const BriefForm = ({
                     nameForm,
                     useQuery,
                     useMutation,
                     fields = [],
                     articleId,
                     isViewOnly = false,
                     checkValidationForm,
                     checkLoading
                   }) => {
  const { data, error, isLoading } = useQuery(articleId);
  const [mutationBrief, {}] = useMutation();
  const [stateFields, setStateFields] = useState({});

  useEffect(() => {
    checkLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!data) return;
    setStateFields({ ...data });
  }, [data]);

  useEffect(() => {
    if (!stateFields || isLoading) return;
    const status = Object.values(stateFields).every((stateField) => !!stateField);

    if (!checkValidationForm) return;
    checkValidationForm(nameForm, status);

  }, [stateFields]);

  const handleFieldSubmit = async (nameField, valueField) => {
    if (!valueField) return;

    const data = { [nameField]: valueField, "articleId": articleId };
    return await mutationBrief({ data }).unwrap();
  };

  const handleFieldFileSubmit = async (data) => {
    if (!data) return;
    await mutationBrief({ data, isFile: true }).unwrap();
  };

  const getPlaceholderField = (field) => {
    const isFile = !!(field?.type === "file");

    if (isFile) {
      const isFileUploaded = stateFields?.[field?.name];
      if (isFileUploaded) return "Файл загружен";
      return field?.placeholder;
    }

    return stateFields?.[field?.name] || field?.placeholder;
  };

  if (isLoading) return <Loader />;
  if (error) return <h2 className="text text_align_center text_color_red">{error}</h2>;

  return (
    <div className={classNames("brief-form", {})}>
      {fields.map((field) => (
        <FormField
          className="brief-form__input"
          name={field?.name}
          key={field?.name}
          defaultValue={stateFields[field?.name]}
          label={field?.label}
          description={field?.description}
          isViewOnly={isViewOnly}
          propsInput={{
            type: field?.type || "text",
            placeholder: getPlaceholderField(field),
            required: true,
            multiple: !!(field?.type === "file")
          }}
          component={<Input />}
          handlers={{ handleFieldSubmit, handleFieldFileSubmit }}
        />
      ))}
    </div>
  );
};

export default BriefForm;
