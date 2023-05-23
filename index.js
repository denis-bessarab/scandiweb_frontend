import express from 'express';
import * as path from 'path';

const app = express();

const staticDir = path.join(__dirname, 'dist');
app.use(express.static(staticDir));

app.get('*', (req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
});
app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port', process.env.PORT || 8080);
});