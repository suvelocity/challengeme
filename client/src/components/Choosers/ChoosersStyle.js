export const customStyles = {
    option: (provided) => ({
        ...provided,
        borderBottom: '1px dotted black',
        color: 'blue',
        backgroundColor: 'white',
        height: '100%',
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: 'neutral30',
    }),
};

export const labelsChooserStyle = {
    option: (provided) => ({
        ...provided,
        border: "1px solid black",
        borderRadius: "3px",
        color: "black",
        fontWeight: "bold",
        width: 100,
        boxSizing: "border-box",
        margin: 3,
        backgroundColor: "rgba(30, 61, 91,0.5)",
        ":hover": {
            backgroundColor: "#1E3D5B",
            color: "white",
        },
        minHeight: 60,
    }),
    menu: (provided) => ({
        ...provided,
        width: 350,
        paddingLeft: 10,
    }),
    menuList: (provided) => ({
        ...provided,
        display: "flex",
        flexWrap: "wrap",
    }),
    control: (provided) => ({
        ...provided,
    }),
};

