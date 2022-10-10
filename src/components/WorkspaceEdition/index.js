/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getHours, format } from 'date-fns/esm';
import {
  Button, Avatar, IconButton, Modal, Typography, Box, TextField, FormControlLabel, Checkbox,
  TableBody, TableCell, TableHead, TableRow, Table,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteTwoTone';
import Calendar from './Calendar';

// import style
import './style.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  // gap: '1.5rem',
};

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function WorkspaceEdition() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({
      type: 'GET_EQUIPMENTS_LIST',
    });
    dispatch({
      type: 'GET_WORKSPACE_TO_EDIT',
      workspaceId: id,
    });
  }, []);

  //   const workspace = useSelector((state) => state.workspaces.currentWorkspace);
  const workspace = useSelector((state) => state.workspaces.workspaceToEdit);
  const workspaceEquipmentsList = useSelector((state) => state.workspaces.workspaceEquipmentsList);
  const mainImage = useSelector((state) => state.workspaces.mainImage);
  const otherImages = useSelector((state) => state.workspaces.otherImages);
  const equipmentsListFromAPI = useSelector((state) => state.workspaces.equipmentsList);
  // const bookingList = workspace.booking_list;
  console.log('MainImage ==>', mainImage);
  console.log('otherImages ==>', otherImages);
  // console.log('bookingList ==>', workspace.booking_list);
  console.log('WORKSPACE====>', workspace);
  console.log('workspaceEquipmentsList ==>', workspaceEquipmentsList);
  console.log('equipmentsListFromAPI ==>', equipmentsListFromAPI);

  const [openModal, setOpenModal] = useState({
    infos: false,
    image: false,
    images: false,
    description: false,
    equipments: false,
  });

  const handleModal = (modaleName, modalStatus) => () => {
    console.log('HANDLE MODALE===>', modaleName, modalStatus);
    setOpenModal({ ...openModal, [modaleName]: modalStatus });
  };

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const [fileOtherImage, setFileOtherImage] = useState(null);
  const [fileDataURLOtherImage, setFileDataURLOtherImage] = useState(null);

  const textButtonModalOtherImages = fileOtherImage ? 'Modifier' : 'Ajouter une image';

  const changeHandler = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setFile(uploadedFile);
  };

  useEffect(() => {
    let fileReader = false;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
          console.log('fileDATA==>', fileDataURL);
          console.log('FILE==>', file);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const changeHandlerOtherImage = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setFileOtherImage(uploadedFile);
  };

  useEffect(() => {
    let fileReader = false;
    let isCancel = false;

    if (fileOtherImage) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURLOtherImage(result);
          console.log('fileDATA==>', fileDataURL);
          console.log('FILE==>', file);
        }
      };
      fileReader.readAsDataURL(fileOtherImage);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [fileOtherImage]);

  const handleEquipmentsChange = (event) => {
    console.log('equipmentChange ===>', event.target.value);

    const equipmentId = Number(event.target.value);

    if (workspaceEquipmentsList.find((equipment) => equipment.equipment_id === equipmentId)) {
      console.log('EQUIPMENT IS IN LIST==>');
      const filteredEquipmentsList = workspaceEquipmentsList.filter((equipment) => equipment.equipment_id !== equipmentId);
      console.log('filteredEquipmentsList==>', filteredEquipmentsList);
      dispatch({
        type: 'SET_WORKSPACE_EQUIPMENTS_LIST',
        workspaceEquipmentsList: filteredEquipmentsList,
      });
    }
    else {
      console.log('EQUIPMENT IS NOT IN LIST');
      const equipmentToAdd = equipmentsListFromAPI.find((equipment) => equipment.id === equipmentId);
      console.log(equipmentToAdd);
      const modifiedEquipmentsList = [...workspaceEquipmentsList, { equipment_id: equipmentToAdd.id, description: equipmentToAdd.description, icon_link: equipmentToAdd.icon_link }];
      dispatch({
        type: 'SET_WORKSPACE_EQUIPMENTS_LIST',
        workspaceEquipmentsList: modifiedEquipmentsList,
      });
    }
  };

  const handleAddNewImage = (event) => {
    event.preventDefault();
    console.log('handleAddNewImage ==>');
  };

  const handleAddNewMainImage = (event) => {
    event.preventDefault();
    console.log('handleAddNewMAINImage  ==>');
  };

  const handleDescriptionFormSubmit = (event) => {
    event.preventDefault();
    console.log('handleDescriptionFormSubmit ==>');
  };

  const handleInfosSubmit = (event) => {
    event.preventDefault();
    console.log('handleInfosSubmit ==>');
  };

  const handleEquipmentsSubmit = (event) => {
    event.preventDefault();
    console.log('handleEquipmentsSubmit ==>');
  };

  const handleInfosChange = (event, inputName) => {
    const inputNameToUpperCase = inputName.toUpperCase();
    console.log(inputNameToUpperCase);
    console.log(event.target.value);
    dispatch({
      type: `SET_${inputNameToUpperCase}`,
      payload: event.target.value,
    });
  };

  const removeImageFromList = (event, imageId) => {
    event.stopPropagation();
    console.log('handle remove', imageId);
    // const filteredImagesList = otherImages.filter((image) => image.name !== imageId);
    // setOtherImages(filteredImagesList);
  };

  return (
    <div>

      {
        workspace
      && (
      <div className="workspaceEdition">

        <div className=" workspaceEditionContainer">

          <div className="infosContainer">
            <h3 className="h3WorkspaceEdition">Infos</h3>

            <div className="infosContainer__infos">
              <p>Titre: {workspace.workspace.title} </p>
              <p>adresse: {workspace.workspace.address}</p>
              <p>Code postale: {workspace.workspace.zip_code}</p>
              <p>Ville: {workspace.workspace.city}</p>
              <p>Prix journée complète: {workspace.workspace.day_price}&euro;</p>
              <p>Prix demi-journée: {workspace.workspace.half_day_price}&euro;</p>
            </div>

            <Button
              variant="contained"
              size="small"
              onClick={handleModal('infos', true)}
              // onClick={openPicturesModale}
              sx={{
                width: '30%',
                height: 40,
                color: '#8A8A8A',
                fontSize: 10,
                backgroundColor: '#FFC000',
                ':hover': {
                  backgroundColor: '#8A8A8A',
                  color: '#FFC000',
                },
              }}
            >Modifier
            </Button>

          </div>

          <Modal
            open={openModal.infos}
            onClose={handleModal('infos', false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" onSubmit={handleInfosSubmit}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Informations générales
              </Typography>
              <TextField
                id="title"
                label="title"
                multiline
                maxRows={4}
                value={workspace.workspace.title}
                onChange={(e) => handleInfosChange(e, 'title')}
                placeholder="Message"
                size="small"
                required
                sx={{
                  width: '100%',
                }}
              />
              <TextField
                id="adress"
                label="adress"
                multiline
                maxRows={4}
                value={workspace.workspace.address}
                onChange={(e) => handleInfosChange(e, 'address')}
                placeholder="Message"
                size="small"
                required
                sx={{
                  width: '100%',
                }}
              />
              <TextField
                id="zipCode"
                label="zipCode"
                value={workspace.workspace.zip_code}
                onChange={(e) => handleInfosChange(e, 'zip_code')}
                placeholder="Message"
                size="small"
                required
                sx={{
                  width: '100%',
                }}
              />
              <TextField
                id="city"
                label="city"
                value={workspace.workspace.city}
                onChange={(e) => handleInfosChange(e, 'city')}
                placeholder="Message"
                size="small"
                required
                sx={{
                  width: '100%',
                }}
              />
              <TextField
                id="fullDayPrice"
                label="fullDayPrice"
                type="number"
                value={workspace.workspace.day_price}
                onChange={(e) => handleInfosChange(e, 'day_price')}
                placeholder="prix journée"
                size="small"
                required
                sx={{
                  width: '100%',
                }}
              />
              <TextField
                id="halfDayPrice"
                label="halfDayPrice"
                type="number"
                value={workspace.workspace.half_day_price}
                onChange={(e) => handleInfosChange(e, 'half_day_price')}
                placeholder="prix journée"
                size="small"
                required
                sx={{
                  width: '100%',
                }}
              />

              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{
                  color: '#8A8A8A',
                  // marginBottom: '1.5rem',
                  width: '50%',
                  // fontSize: 10,
                  backgroundColor: '#FFC000',
                  ':hover': {
                    backgroundColor: '#8A8A8A',
                    color: '#FFC000',
                  },
                }}
              >Valider
              </Button>
            </Box>
          </Modal>

          <div className="mainImage">

            <h3 className="h3WorkspaceEdition">Image principale</h3>
            <div className="workspaceEditionContainer__mainImageContainer">
              <img className="workspaceEditionContainer__mainImageContainer__img" src={fileDataURL || mainImage[0].link} alt="" />
            </div>

            {/* <form onSubmit={handleSubmit}> */}

            <Button
              variant="contained"
              component="label"
              onClick={handleModal('image', true)}
              sx={{
                width: '100%',
                height: 40,
                marginTop: '.7rem',
                color: '#8A8A8A',
                fontSize: 10,
                backgroundColor: '#FFC000',
                ':hover': {
                  backgroundColor: '#8A8A8A',
                  color: '#FFC000',
                },
              }}
            >
              modifier

            </Button>

            {/* </form> */}

          </div>

          <Modal
            open={openModal.image}
            onClose={handleModal('image', false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" onSubmit={handleAddNewMainImage}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>

              <div className="workspaceEditionContainer__mainImageContainer">
                <img className="workspaceEditionContainer__mainImageContainer__img" src={fileDataURL || mainImage[0].link} alt="" />
              </div>

              <Button
                variant="contained"
                component="label"
                sx={{
                  width: '30%',
                  height: 40,
                  marginTop: '.7rem',
                  color: '#8A8A8A',
                  fontSize: 10,
                  backgroundColor: '#FFC000',
                  ':hover': {
                    backgroundColor: '#8A8A8A',
                    color: '#FFC000',
                  },
                }}
              >
                modifier
                <input
                  hidden
                  type="file"
                  id="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={changeHandler}
                />
              </Button>

              <Button
                variant="contained"
                size="small"
                type="submit"
                disabled={!file}
                sx={{
                  width: '30%',
                  height: 40,
                  color: '#8A8A8A',
                  fontSize: 10,
                  backgroundColor: '#FFC000',
                  ':hover': {
                    backgroundColor: '#8A8A8A',
                    color: '#FFC000',
                  },
                }}
              >valider
              </Button>

            </Box>
          </Modal>

          <div className="otherImagesContainer">
            <h3 className="h3WorkspaceEdition">Autres images</h3>
            <div className="imagesListContainer">
              {
              otherImages.map((image) => (
                <div key={image.id} className="listItem">
                  <div className="listItem__imageContainer">
                    <img className="listItem__imageContainer__img" src={image.link} alt="" />
                  </div>
                  <IconButton
                    aria-label="delete"
                    onClick={(event) => removeImageFromList(event, image.id)}
                    sx={{
                      width: 30,
                      height: 30,
                      color: '#8A8A8A',
                      margin: '.5rem',
                      fontSize: 10,
                      ':hover': {
                        backgroundColor: 'white',
                        color: 'crimson',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))
            }
            </div>
            <Button
              variant="contained"
              size="small"
              onClick={handleModal('images', true)}
              sx={{
                width: '30%',
                height: 40,
                color: '#8A8A8A',
                marginTop: '1rem',
                fontSize: 10,
                backgroundColor: '#FFC000',
                ':hover': {
                  backgroundColor: '#8A8A8A',
                  color: '#FFC000',
                },
              }}
            >Ajouter une photos
            </Button>
          </div>

          <Modal
            open={openModal.images}
            onClose={handleModal('images', false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" onSubmit={handleAddNewImage}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ajouter une image
              </Typography>

              <div className="workspaceEditionContainer__mainImageContainer">
                <img className="workspaceEditionContainer__mainImageContainer__img" src={fileDataURLOtherImage || mainImage.link} alt="" />
              </div>

              <Button
                variant="contained"
                component="label"
                sx={{
                  width: '30%',
                  height: 40,
                  marginTop: '.7rem',
                  color: '#8A8A8A',
                  fontSize: 10,
                  backgroundColor: '#FFC000',
                  ':hover': {
                    backgroundColor: '#8A8A8A',
                    color: '#FFC000',
                  },
                }}
              >
                {textButtonModalOtherImages}
                <input
                  hidden
                  type="file"
                  id="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={changeHandlerOtherImage}
                />
              </Button>

              <Button
                variant="contained"
                size="small"
                type="submit"
                disabled={!fileOtherImage}
                sx={{
                  width: '30%',
                  height: 40,
                  color: '#8A8A8A',
                  fontSize: 10,
                  backgroundColor: '#FFC000',
                  ':hover': {
                    backgroundColor: '#8A8A8A',
                    color: '#FFC000',
                  },
                }}
              >valider
              </Button>

            </Box>
          </Modal>

          <div className="descriptionContainer">
            <h3 className="h3WorkspaceEdition">Description</h3>
            <div className="descriptionContainer__description">
              <p>{workspace.workspace.description}</p>
            </div>

            <Button
              variant="contained"
              size="small"
              onClick={handleModal('description', true)}
              sx={{
                width: '30%',
                height: 40,
                color: '#8A8A8A',
                fontSize: 10,
                backgroundColor: '#FFC000',
                ':hover': {
                  backgroundColor: '#8A8A8A',
                  color: '#FFC000',
                },
              }}
            >Modifier
            </Button>
          </div>

          <Modal
            open={openModal.description}
            onClose={handleModal('description', false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" onSubmit={handleDescriptionFormSubmit}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>

              <TextField
                id="description"
                label="description"
                multiline
                rows={12}
                value={workspace.workspace.description}
                onChange={(e) => handleInfosChange(e, 'description')}
                placeholder="Message"
                size="small"
                required
                sx={{
                  width: '100%',
                }}
              />

              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{
                  color: '#8A8A8A',
                  // marginBottom: '1.5rem',
                  width: '50%',
                  // fontSize: 10,
                  backgroundColor: '#FFC000',
                  ':hover': {
                    backgroundColor: '#8A8A8A',
                    color: '#FFC000',
                  },
                }}
              >Valider
              </Button>

            </Box>
          </Modal>

          <div className="equipmentContainer">
            <h3 className="h3WorkspaceEdition">Liste des equipements disponibles</h3>
            <div className="equipmentsListContainer">
              {
                workspaceEquipmentsList.map((equipment) => (
                  <div className="equipmentsListContainer__equipment" key={equipment.id}>
                    <Avatar alt={equipment.description} src={equipment.icon} />
                    <p className="equipmentsListContainer__equipment__name">{equipment.description}</p>
                  </div>
                ))
              }
            </div>

            <Button
              variant="contained"
              size="small"
              onClick={handleModal('equipments', true)}
              sx={{
                width: '30%',
                height: 40,
                color: '#8A8A8A',
                fontSize: 10,
                backgroundColor: '#FFC000',
                ':hover': {
                  backgroundColor: '#8A8A8A',
                  color: '#FFC000',
                },
              }}
            >Ajouter des equipements
            </Button>
          </div>

          <Modal
            open={openModal.equipments}
            onClose={handleModal('equipments', false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" onSubmit={handleEquipmentsSubmit}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>

              <div className="equipmentsListModal">
                {equipmentsListFromAPI.map((equipment) => (
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(workspaceEquipmentsList.find((equipmentInList) => equipmentInList.equipment_id === equipment.id))} />}
                    key={equipment.id}
                    label={equipment.description}
                    value={equipment.id}
                    onClick={handleEquipmentsChange}
                    sx={{
                      width: '100%',
                      height: 20,
                      fontSize: 10,
                    }}
                  />
                ))}
              </div>

              <Button
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  width: '30%',
                  height: 40,
                  color: '#8A8A8A',
                  fontSize: 10,
                  backgroundColor: '#FFC000',
                  ':hover': {
                    backgroundColor: '#8A8A8A',
                    color: '#FFC000',
                  },
                }}
              >valider
              </Button>

            </Box>
          </Modal>

          <div className="workspaceEditionContainer__bookingsContainer">
            <h3 className="h3WorkspaceEdition">Réservations</h3>
            <div className="workspaceEditionContainer__bookingsContainer__content">
              <Calendar />
              <div className="workspaceEditionContainer__bookingsContainer__bookingsDate">
                <Table
                  sx={{
                    minWidth: 'auto',
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                        }}
                        align="center"
                      >
                        Numero
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                        }}
                        align="center"
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                        }}
                        align="center"
                      >
                        Creneau
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workspace.booking_list.map((booking) => (
                      <TableRow
              // eslint-disable-next-line react/no-array-index-key
                        key={booking.booking_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center" component="th" scope="row">{booking.booking_id}</TableCell>
                        <TableCell align="center">{ format(new Date(booking.start_date), 'dd/MM/yy') }</TableCell>
                        <TableCell align="center">{getHours(new Date(booking.start_date))}H-{getHours(new Date(booking.end_date))}H</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* {
                  workspace.booking_list.map((booking) => (
                    <div className="workspaceEditionContainer__bookingsContainer__bookingsDate__item" key={booking.booking_id}>
                      <p className="workspaceEditionContainer__bookingsContainer__bookingsDate__item__num">Reservation n°: {booking.booking_id}</p>
                      <p className="workspaceEditionContainer__bookingsContainer__bookingsDate__item__date">
                        Du &nbsp; {lightFormat(new Date(booking.start_date), 'dd-MM-yy')} {getHours(new Date(booking.start_date))}H &nbsp; Au &nbsp; {lightFormat(new Date(booking.end_date), 'dd-MM-yy')} {getHours(new Date(booking.end_date))}H
                      </p>
                    </div>
                  ))
              } */}

              </div>
            </div>
          </div>

        </div>
      </div>
      )
      }
    </div>

  );
}

export default WorkspaceEdition;

//

//   <Button variant="contained" component="label">
//     modifier
//     <input
//       hidden
//       type="file"
//       id="image"
//       accept=".png, .jpg, .jpeg"
//       onChange={changeHandler}
//     />
//   </Button>;

// { /* <form>
//         <label htmlFor="image"> ajouter une Image  </label>
//         <input
//           type="file"
//           id="image"
//           accept=".png, .jpg, .jpeg"
//           onChange={changeHandler}
//         />

//         <input type="submit" label="Upload" />

//       </form> */ }
// { /* {fileDataURL
//         ? (
//           <p className="img-preview-wrapper">
//             <img src={fileDataURL} alt="preview" />
//           </p>
//         ) : null} */ }

//   const [imageFiles, setImageFiles] = useState([]);
//   const [images, setImages] = useState([]);

//   const changeHandlerOtherImages = (e) => {
//     const { files } = e.target;
//     const validImageFiles = [];
//     for (let i = 0; i < files.length; i++) {
//       const uploadedFile = files[i];
//       if (uploadedFile.type.match(imageMimeType)) {
//         validImageFiles.push(uploadedFile);
//       }
//     }
//     if (validImageFiles.length) {
//       setImageFiles(validImageFiles);
//       return;
//     }
//     alert('Selected images are not of valid type!');
//   };

//   useEffect(() => {
//     const uploadedImages = [];
//     const fileReaders = [];
//     let isCancel = false;
//     if (imageFiles.length) {
//       imageFiles.forEach((fileItem) => {
//         const fileReader = new FileReader();
//         fileReaders.push(fileReader);
//         fileReader.onload = (e) => {
//           const { result } = e.target;
//           if (result) {
//             images.push(result);
//           }
//           if (uploadedImages.length === imageFiles.length && !isCancel) {
//             setImages(uploadedImages);
//           }
//         };
//         fileReader.readAsDataURL(fileItem);
//       });
//     }
//     return () => {
//       isCancel = true;
//       fileReaders.forEach((fileReader) => {
//         if (fileReader.readyState === 1) {
//           fileReader.abort();
//         }
//       });
//     };
//   }, [imageFiles]);

// { /* <div className="otherImagesContainer">

// {
// images.length > 0

//   ? images.map((image) => (
//     <div className="workspaceEditionContainer__mainImageContainer">

//       <img className="image" key={image} src={image} alt="" />

//     </div>
//   ))
//   : (
//     <div className="workspaceEditionContainer__mainImageContainer">

//       <img className="image" src="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png" alt="" />

//     </div>
//   )
// }

// <Button variant="contained" component="label">
//   modifier
//   <input
//     hidden
//     type="file"
//     id="image"
//     accept=".png, .jpg, .jpeg"
//     onChange={changeHandlerOtherImages}
//   />
// </Button>

// </div> */ }

// { /* <Button
//               variant="contained"
//               component="label"
//               sx={{
//                 width: '100%',
//                 height: 40,
//                 marginTop: '.7rem',
//                 color: '#8A8A8A',
//                 fontSize: 10,
//                 backgroundColor: '#FFC000',
//                 ':hover': {
//                   backgroundColor: '#8A8A8A',
//                   color: '#FFC000',
//                 },
//               }}
//             >
//               Valider
//               <input hidden type="submit" />
//             </Button> */ }

// Du {lightFormat(new Date(booking.start_date), 'dd-MM-yy-HH'} 'Au' {lightFormat(new Date(booking.end_date), 'dd-MM-yy-HH'}