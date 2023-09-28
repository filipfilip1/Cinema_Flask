import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import QRCode from 'qrcode';
import { DownloadTicketButton } from "./GenerateTicket.styles";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function GenerateTicket({ clientName, selectedSeats, showtime }) {

    const generatePDF = async () => {
        const qrCodeDataURL = await QRCode.toDataURL(clientName );

        const seatsContent = selectedSeats.map(seat => {
            return { text: `Miejsce: Rząd ${seat.seat_row} Miejsce ${seat.seat_column}`, margin: [0, 5] };
        });

        const documentDefinition = {
            content: [
                { text: 'Bilet', style: 'header' },
                { text: `Film: ${showtime.title}`, style: 'subheader' },
                { text: `Imię: ${clientName}`, style: 'subheader'},
                { text: `Data i czas: ${showtime.formattedDate} ${showtime.formattedTime}`, style: 'subheader' },
                { text: `Kino: ${showtime.cinema}`, style: 'subheader'},
                { text: `Sala: ${showtime.hall_name}`, style: 'subheader'},
                ...seatsContent,
                { image: qrCodeDataURL }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 10, 0, 5]
                }
            }
        };

        const fileName = `ticket_${showtime.title}_${showtime.id}_${clientName}`
        pdfMake.createPdf(documentDefinition).download(fileName);
    };

    return (
        <DownloadTicketButton onClick={generatePDF}>
            Pobierz bilet
        </DownloadTicketButton>
    );
}

export default GenerateTicket;
