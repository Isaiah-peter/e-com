import React, { useRef, useState } from 'react'

const CreateProduct = () => {
  const [image, setImage] = useState('')
  const [product, setProduct] = useState({
    name: 
  })

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
    
  return (
    <div className="body d-flex py-3 ">
      <div className="container-xxl">
        <div className='row align-items-center w-100'>
          <div className="border-0 w-100 mb-4">
            <div className="w-100 card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
              <h3 className="fw-bold mb-0">Products Add</h3>
              <button type="submit" className="btn btn-primary btn-set-task w-sm-100 text-uppercase px-5">Save</button>
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-xl-4 col-lg-4">
            <div className="sticky-lg-top">
              <div class="card mb-3">
                <div class="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                  <h6 class="m-0 fw-bold">Pricing Info</h6>
                </div><div class="card-body">
                  <div class="row g-3 align-items-center">
                    <div class="col-md-12">
                      <label class="form-label">Product Price</label>
                      <input type="text" class="form-control" placeholder='1200'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                  <h6 className="m-0 fw-bold">Categories</h6>
                </div>
                <div className="card-body">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-12">
                      <label className="form-label">Product categories</label>
                      <input type="text" className="form-control" placeholder='women, man' />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                  <h6 className="m-0 fw-bold">Sizes</h6>
                </div>
                <div className="card-body">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-12">
                      <label className="form-label">Product Sizes</label>
                      <input type="text" className="form-control" placeholder='12, 23, 56' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8">
            <div className="card mb-3">
              <div class="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 class="mb-0 fw-bold ">Basic information</h6>
              </div>
              <div class="card-body">
                <form>
                  <div class="row g-3 align-items-center">
                    <div class="col-md-6">
                      <label class="form-label">Name</label>
                      <input type="text" class="form-control" placeholder="Nike shoe" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Longname</label>
                      <input type="text" class="form-control" placeholder='longname' />
                    </div>
                    <div class="col-md-12 mt-4">
                      <label class="form-label">Product Description</label>
                      <textarea class="form-control" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card mb-3">
              <div className="col-md-12 d-flex flex-column">
                <label className='form-label'>Product Image</label>
                {
                  image && (<img className='img-fluid align-self-center mb-3' width={200} height={200} src={image} alt={'imag'} />)
                }
                <input type="file" className='form-control' onChange={onChange} />
                {
                  image && (<button className="btn btn-primary btn-set-task w-50 text-uppercase px-5 mt-3">Save</button>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct