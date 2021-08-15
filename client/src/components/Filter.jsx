import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, DropdownButton, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

import '../css/Filter.css'


function Filter(props) {

  const tiers = [
    'All Tiers',
    'Iron',
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Diamond',
    'Master',
    'Grandmaster',
    'Challenger' 
  ]

  const [selectedTier, setSelectedTier] = useState('All Tiers');
  const [selectedPositions, setSelectedPositions] = useState();  


  const triggerUseEffectRef = useRef(false); 
  useEffect(() => {
    if(triggerUseEffectRef.current) {
      props.filterTier(selectedTier);
      props.filterPosition(selectedPositions);
    }
    else {
      triggerUseEffectRef.current = true;
    }
  }, [selectedTier, selectedPositions]) // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleTierSelect = (targetTier) => { 
    setSelectedTier(targetTier); 
  }

  const handlePositionSelect = (targetPos) => { 
    setSelectedPositions(targetPos);
  }

  return (
    <Row className='justify-content-start mb-3 mt-2'>
      <Row>
        <Col className='d-inline-flex mb-2'>
          <h6 className='my-auto text-white me-2 ms-1'>Filters</h6>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-filter" viewBox="0 0 16 16">
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>
          
        </Col>
      </Row>
      <Row>
        <Col className='col-1 my-auto me-5' >
          <DropdownButton title={selectedTier + ' '} variant='dark'>
            {tiers.map((tier, index) => (
              <Dropdown.Item key={index} onSelect={handleTierSelect} eventKey={tier}>
                {tier}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col className='col-3 my-auto'>
        <ToggleButtonGroup type="checkbox" value={selectedPositions} onChange={handlePositionSelect}>
          <ToggleButton id="pos-btn-1" value='position-fill' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png'
              alt=''
            />
          </ToggleButton>
          <ToggleButton id="pos-btn-2" value='position-top' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png'
              alt=''
            />
          </ToggleButton>
          <ToggleButton id="pos-btn-3" value='position-middle' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png'
              alt=''
            />
          </ToggleButton>
          <ToggleButton id="pos-btn-4" value='position-jungle' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png'
              alt=''
            />
          </ToggleButton>
          <ToggleButton id="pos-btn-5" value='position-bottom' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png'
              alt=''
            />
          </ToggleButton>
          <ToggleButton id="pos-btn-6" value='position-utility' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'
              alt=''
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
      </Row>
    </Row>
    
  );
}


export default Filter;
