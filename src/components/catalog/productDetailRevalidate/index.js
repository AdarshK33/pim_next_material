import React from 'react';
import styles from './productDetailRevalidate.module.css';

const ProductDetailRevalidate = () => {
    return (
        <>
          <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              style={{ borderBottom: "3px solid #aaa", padding: "5px" }}
            >
              <Typography variant="h7" className={styles.main_title}>
                Product Details
              </Typography>
              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => setShowUserAddForm(true)}
              >
                Activate
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
              {/* <CustomModal
                openModal={showUserAddForm}
                closeModal={() => setShowUserAddForm(false)}
                body={<AddForm classModal={() => setShowUserAddForm(false)} />}
              /> */}
            </Grid>
            <Card>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                style={{ borderBottom: "2px solid #bbb", padding: "5px" }}
              >
                <Typography variant="h7" className={styles.sub_title}>
                  AX-MASTER
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "orange", borderBottom: "2px solid #ffcf76" }}
                  onClick={() => setShowModal(true)}
                >
                  Revalidate
                </Typography>
                <CustomModal
                openModal={showModal}
                closeModal={() => setShowModal(false)}
                body={<AddForm classModal={() => setShowModal(false)} />}
              />
              </Grid>
              <CardContent>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item ID"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category ID"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category Name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Logistics"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Disease Type"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Puch UOM Factor"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Unit Of Measurement"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <Grid
                container
                spacing={0}
                justifyContent="space-between"
                alignItems="center"
                style={{ borderBottom: "2px solid #bbb", padding: "5px" }}
              >
                <Typography variant="h7" className={styles.sub_title}>
                  KEYMED MASTER
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "orange", borderBottom: "2px solid #ffcf76" }}
                >
                  Revalidate
                </Typography>
              </Grid>
              <CardContent>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item ID"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category ID"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category Name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Logistics"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Disease Type"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Puch UOM Factor"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Unit Of Measurement"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <Grid
                container
                spacing={0}
                justifyContent="space-between"
                alignItems="center"
                style={{ borderBottom: "2px solid #bbb", padding: "5px" }}
              >
                <Typography variant="h7" className={styles.sub_title}>
                  R_DURGS MASTER
                </Typography>
                <Typography
                  variant="h7"
                  style={{ color: "orange", borderBottom: "2px solid #ffcf76" }}
                >
                  Revalidate
                </Typography>
              </Grid>
              <CardContent>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item ID"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category ID"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Item Category Name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Logistics"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Disease Type"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Puch UOM Factor"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Unit Of Measurement"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Card>
        </Grid>
      </Grid>  
        </>
    );
};

export default ProductDetailRevalidate;