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

  const [selectedTier, setSelectedTier] = useState();
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
      <Col className='col-1 my-auto' >
        <DropdownButton title='Tiers ' variant='dark' size=''>
          {tiers.map((tier, index) => (
            <Dropdown.Item key={index} onSelect={handleTierSelect} eventKey={tier}>
              {tier}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Col>
      <Col className='col-3 my-auto'>
        <ToggleButtonGroup type="checkbox" value={selectedPositions} onChange={handlePositionSelect}>
          <ToggleButton className='' size='' id="pos-btn-1" value='position-fill' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png'
              alt=''
              height=''
              width=''
            />
          </ToggleButton>
          <ToggleButton className='' size='' id="pos-btn-2" value='position-top' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png'
              alt=''
              height=''
              width=''
            />
          </ToggleButton>
          <ToggleButton className='' size='' id="pos-btn-3" value='position-middle' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png'
              alt=''
              height=''
              width=''
            />
          </ToggleButton>
          <ToggleButton className='' size='' id="pos-btn-4" value='position-jungle' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png'
              alt=''
              height=''
              width=''
            />
          </ToggleButton>
          <ToggleButton className='' size='' id="pos-btn-5" value='position-bottom' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png'
              alt=''
              height=''
              width=''
            />
          </ToggleButton>
          <ToggleButton className='' size='' id="pos-btn-6" value='position-utility' variant='outline-dark'>
            <img className='img-fluid'
              src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'
              alt=''
              height=''
              width=''
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
      
    </Row>
    
  );
}


export default Filter;
