import React, { useState, useEffect } from 'react';
import { Grid, Card, Avatar, Typography, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { experts } from '../../data/experts';
import '../../styles/experts.css';
import { expertAPI } from '../../services/api';

const ExpertList = () => {
  const { expertType } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const data = await expertAPI.getAllExperts(expertType);
        setExperts(data);
      } catch (error) {
        console.error('Error fetching experts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, [expertType]);

  const filteredExperts = experts.filter(expert => 
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="expert-list-container">
      <div className="search-bar">
        <TextField
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ಹೆಸರು ಅಥವಾ ವಿಶೇಷತೆಯ ಮೂಲಕ ಹುಡುಕಿ"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <Grid container spacing={3}>
        {filteredExperts.map(expert => (
          <Grid item xs={12} sm={6} md={4} key={expert.id}>
            <Card 
              className="expert-list-card"
              onClick={() => navigate(`/experts/${expertType}/${expert.id}`)}
            >
              <div className="expert-avatar">
                <Avatar 
                  src={expert.image}
                  sx={{ width: 120, height: 120 }}
                />
                <Typography variant="h6">{expert.name}</Typography>
                <Typography variant="subtitle1">{expert.designation}</Typography>
                <Typography variant="body2">{expert.specialization}</Typography>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ExpertList;
